variable "az_count" {
  type    = number
  default = 2
}

variable "prefix" {
  type    = string
  default = "stam-acasa"
}

variable "IMAGE_FRONTEND" {
  type = string
  #default = "code4romania/stamacasa:develop"
  default = "code4romania/stamacasa:develop"
}

variable "IMAGE_API" {
  type = string
  #default = "code4romania/stamacasa-api:develop"
  default = "code4romania/stamacasa-api:develop"
}
variable "IMAGE_IDENTITYSERVER" {
  type = string
  #default = "code4romania/stamacasa-identityserver:develop"
  default = "code4romania/stamacasa-identityserver:develop"
}
variable "IMAGE_POSTGRES" {
  type = string
  default = "postgres"
}
variable "region" {
  default = "eu-west-2"
}
variable "workspace" {
  default = "develop"
}