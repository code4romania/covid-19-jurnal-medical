provider "aws" {
  region = var.region
}

locals {
  #name        = "${var.prefix}-${var.workspace}"
  name        = "${var.prefix}-${var.workspace}"
  domain_root = "stamacasa.ro"

  subdomains_frontend = [
    "www.${local.domain_root}",                   # PROD
    "staging.${local.domain_root}",               # STAGING
    "${var.workspace}.${local.domain_root}" # DEV
  ]
  subdomains_api = [
    "api1.${local.domain_root}",                      # PROD
    "staging-api.${local.domain_root}",               # STAGING
    "${var.workspace}-api.${local.domain_root}" # DEV
  ]
  subdomains_identitysrv= [
    "identitysrv.${local.domain_root}",                       # PROD
    "staging-identitysrv.${local.domain_root}",               # STAGING
    "${var.workspace}-identitysrv.${local.domain_root}" # DEVS
  ]
  subdomains_postgres = [
    "postgres.${local.domain_root}",                       # PROD
    "staging-postgres${local.domain_root}",               # STAGING
    "${var.workspace}-postgres.${local.domain_root}" # DEVS
  ]

  domain_frontend = "${var.workspace == "production" ? local.subdomains_frontend[0]
  : var.workspace == "staging" ? local.subdomains_frontend[1] : local.subdomains_frontend[2]}"

  domain_api = "${var.workspace == "production" ? local.subdomains_api[0]
  : var.workspace == "staging" ? local.subdomains_api[1] : local.subdomains_api[2]}"

  domain_identitysrv = "${var.workspace == "production" ? local.subdomains_identitysrv[0]
  : var.workspace == "staging" ? local.subdomains_identitysrv[1] : local.subdomains_identitysrv[2]}"

  domain_postgres = "${var.workspace == "production" ? local.subdomains_postgres[0]
  : var.workspace == "staging" ? local.subdomains_postgres[1] : local.subdomains_postgres[2]}"


}
