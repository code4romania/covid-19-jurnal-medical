data "aws_route53_zone" "main" {
  name         = local.domain_root
  private_zone = false
}

module "front-end_dns" {
  source      = "./dns"
  zone_id     = data.aws_route53_zone.main.zone_id
  domain      = local.domain_frontend
  destination = [module.front-end.dns]
}

module "api_dns" {
  source      = "./dns"
  zone_id     = data.aws_route53_zone.main.zone_id
  domain      = local.domain_api
  destination = [module.api.dns]
}

module "identitysrv_dns" {
  source      = "./dns"
  zone_id     = data.aws_route53_zone.main.zone_id
  domain      = local.domain_identitysrv
  destination = [module.identitysrv.dns]
}

module "postgres_dns" {
  source      = "./dns"
  zone_id     = data.aws_route53_zone.main.zone_id
  domain      = local.domain_postgres
  destination = [module.postgres.dns]
}

resource "aws_route53_record" "root" {
  count   = terraform.workspace == "production" ? 1 : 0
  zone_id = data.aws_route53_zone.main.zone_id
  name    = local.domain_root
  type    = "A"

  alias {
    zone_id                = module.front-end.zone_id
    name                   = module.front-end.dns
    evaluate_target_health = false
  }
}

resource "aws_acm_certificate" "cert" {
  domain_name               = terraform.workspace == "production" ? local.domain_root : module.front-end_dns.fqdn
<<<<<<< Updated upstream
  subject_alternative_names = terraform.workspace == "production" ? [module.front-end_dns.fqdn, module.api_dns.fqdn, module.postgres_dns.fqdn] : [module.api_dns.fqdn]
=======
  subject_alternative_names = terraform.workspace == "production" ? [module.front-end_dns.fqdn, module.api_dns.fqdn,module.postgres_dns.fqdn ] : [module.api_dns.fqdn]
>>>>>>> Stashed changes

  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "identitysrv" {
  domain_name = module.identitysrv_dns.fqdn

  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "postgres" {
  domain_name = module.postgres_dns.fqdn

  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  count   = length(aws_acm_certificate.cert.domain_validation_options.*)
<<<<<<< Updated upstream
  #count   = "${length(aws_acm_certificate.cert.subject_alternative_names.*)+1}"
=======
>>>>>>> Stashed changes
  name    = aws_acm_certificate.cert.domain_validation_options[count.index].resource_record_name
  type    = aws_acm_certificate.cert.domain_validation_options[count.index].resource_record_type
  zone_id = data.aws_route53_zone.main.zone_id
  records = [aws_acm_certificate.cert.domain_validation_options[count.index].resource_record_value]
  ttl     = 60

  depends_on = [
    aws_acm_certificate.cert
  ]
}

resource "aws_route53_record" "cert_validation-identitysrv" {
  name    = aws_acm_certificate.identitysrv.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.identitysrv.domain_validation_options.0.resource_record_type
  zone_id = data.aws_route53_zone.main.zone_id
  records = [aws_acm_certificate.identitysrv.domain_validation_options.0.resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = concat(aws_route53_record.cert_validation.*.fqdn, [aws_route53_record.cert_validation-identitysrv.fqdn])
}
