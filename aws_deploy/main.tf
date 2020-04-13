provider "aws" {
  region = var.region
}

locals {
  #name        = "${var.prefix}-${var.workspace}"
  name        = "${var.prefix}-${terraform.workspace}"
  domain_root = "stamacasa.ro"

  subdomains_frontend = [
    "www.${local.domain_root}",                   # PROD
    "staging.${local.domain_root}",               # STAGING
    "${terraform.workspace}.${local.domain_root}" # DEV
  ]
  subdomains_api = [
    "api1.${local.domain_root}",                      # PROD
    "staging-api.${local.domain_root}",               # STAGING
    "${terraform.workspace}-api.${local.domain_root}" # DEV
  ]
  subdomains_identitysrv= [
    "identitysrv.${local.domain_root}",                       # PROD
    "staging-identitysrv.${local.domain_root}",               # STAGING
    "${terraform.workspace}-identitysrv.${local.domain_root}" # DEVS
  ]
  subdomains_postgres = [
    "postgres.${local.domain_root}",                       # PROD
    "staging-postgres.${local.domain_root}",               # STAGING
    "${terraform.workspace}-postgres.${local.domain_root}" # DEVS
  ]

  subdomains_emailservice = [
    "emailservice.${local.domain_root}",                       # PROD
    "staging-emailservice.${local.domain_root}",               # STAGING
    "${terraform.workspace}-emailservice.${local.domain_root}" # DEVS
  ]

  subdomains_jobscheduler = [
    "jobscheduler.${local.domain_root}",                       # PROD
    "staging-jobscheduler.${local.domain_root}",               # STAGING
    "${terraform.workspace}-jobscheduler.${local.domain_root}" # DEVS
  ]

  domain_frontend = "${terraform.workspace == "production" ? local.subdomains_frontend[0]
  : terraform.workspace == "staging" ? local.subdomains_frontend[1] : local.subdomains_frontend[2]}"

  domain_api = "${terraform.workspace == "production" ? local.subdomains_api[0]
  : terraform.workspace == "staging" ? local.subdomains_api[1] : local.subdomains_api[2]}"

  domain_identitysrv = "${terraform.workspace == "production" ? local.subdomains_identitysrv[0]
  : terraform.workspace == "staging" ? local.subdomains_identitysrv[1] : local.subdomains_identitysrv[2]}"

  domain_postgres = "${terraform.workspace == "production" ? local.subdomains_postgres[0]
  : terraform.workspace == "staging" ? local.subdomains_postgres[1] : local.subdomains_postgres[2]}"

  domain_emailservice = "${terraform.workspace == "production" ? local.subdomains_emailservice[0]
  : terraform.workspace == "staging" ? local.subdomains_emailservice[1] : local.subdomains_emailservice[2]}"

  domain_jobscheduler = "${terraform.workspace == "production" ? local.subdomains_jobscheduler[0]
  : terraform.workspace == "staging" ? local.subdomains_jobscheduler[1] : local.subdomains_jobscheduler[2]}"
}

terraform {
  #required_version = ">=0.12.13"
  backend "s3" {
    bucket         = "code4ro-terraform-tfstate"
    key            = "stam-acasa/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
