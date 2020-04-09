resource "aws_ecs_cluster" "app" {
  name = local.name

  tags = {
    Name = local.name
  }
}

#################################################
# Execution Role
#################################################

resource "aws_iam_role" "ecs_execution" {
  name = "${local.name}-ecs_execution"

  assume_role_policy = <<DOCUMENT
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": [
          "ecs-tasks.amazonaws.com"
        ]
      }
    }
  ]
}
DOCUMENT
}

resource "aws_iam_role_policy_attachment" "ecr_and_logs" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  #policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_role_policy_attachment" "use_ssm_parameter" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = aws_iam_policy.use_ssm_parameter.arn
}

resource "aws_iam_policy" "use_ssm_parameter" {
  name   = "${local.name}_use-ssm-parameter"
  policy = data.aws_iam_policy_document.use_ssm_parameter.json
}

data "aws_iam_policy_document" "use_ssm_parameter" {
  statement {
    actions = [
      "ssm:DescribeParameters"
    ]
    resources = ["*"]
    effect    = "Allow"
  }
  statement {
    actions = [
      "ssm:GetParameter*"
    ]
    #resources = [
    #  aws_ssm_parameter.identitysrv_access_key_id.arn,
    #  aws_ssm_parameter.identitysrv_secret_access_key.arn
    #]
    effect = "Allow"
  }
  statement {
    actions = [
      "kms:Decrypt"
    ]
    #resources = [
    #  aws_kms_key.ssm_key.arn
    #]
    effect = "Allow"
  }
}

#################################################
# Services
#################################################

module "front-end" {
  source = "./service"

  name = "front-end"

  cluster         = aws_ecs_cluster.app.id
  vpc_id          = aws_vpc.main.id
  subnets         = aws_subnet.private.*.id
  lb-subnets      = aws_subnet.public.*.id
  security_groups = [aws_security_group.intra.id]
  lb-security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]
  certificate_arn = aws_acm_certificate.cert.arn

  container_port     = 80
  execution_role_arn = aws_iam_role.ecs_execution.arn
  image              = var.IMAGE_FRONTEND
  prefix             = local.name
  region             = var.region
}

module "api" {
  source = "./service"

  name           = "api"
  #instance_count = terraform.workspace == "production" ? 50 : 1

  cluster         = aws_ecs_cluster.app.id
  vpc_id          = aws_vpc.main.id
  subnets         = aws_subnet.private.*.id
  lb-subnets      = aws_subnet.public.*.id
  security_groups = [aws_security_group.intra.id]
  lb-security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]
  certificate_arn = aws_acm_certificate.cert.arn

  container_port     = 80
  execution_role_arn = aws_iam_role.ecs_execution.arn
  image              = var.IMAGE_API
  prefix             = local.name
  region             = var.region
}

module "identitysrv" {
  source = "./service"

  name = "identitysrv"

  cluster         = aws_ecs_cluster.app.id
  vpc_id          = aws_vpc.main.id
  subnets         = aws_subnet.private.*.id
  lb-subnets      = aws_subnet.public.*.id
  security_groups = [aws_security_group.intra.id]
  lb-security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]
  certificate_arn = aws_acm_certificate.identitysrv.arn

  container_port     = 80
  execution_role_arn = aws_iam_role.ecs_execution.arn
  image              = var.IMAGE_IDENTITYSERVER
  prefix             = local.name
   region             = var.region  
}
module "postgres" {
  source = "./service"

  name = "postgres"

  cluster         = aws_ecs_cluster.app.id
  vpc_id          = aws_vpc.main.id
  subnets         = aws_subnet.private.*.id
  lb-subnets      = aws_subnet.public.*.id
  security_groups = [aws_security_group.intra.id]
  lb-security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]
  certificate_arn = aws_acm_certificate.postgres.arn

  container_port     = 80
  execution_role_arn = aws_iam_role.ecs_execution.arn
  image              = var.IMAGE_POSTGRES
  prefix             = local.name  
}
