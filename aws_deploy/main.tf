provider "aws" {
  region = var.region
}

locals {
  name        = "${var.prefix}-${var.env}"
  domain_root = "stamacasa.ro"  
}