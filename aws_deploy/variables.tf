variable "az_count" {
  type    = number
  default = 2
}

variable "prefix" {
  type    = string
  default = "date-la-zi"
}

variable "IMAGE_FRONTEND" {
  type = string
  default = "code4romania/stamacasa:develop"
}

variable "IMAGE_API" {
  type = string
  default = "code4romania/stamacasa-api:develop"
}
variable "IMAGE_IDENTITYSERVER" {
  type = string
  default = "code4romania/stamacasa-identityserver:develop"
}
variable "IMAGE_POSTGRES" {
  type = string
  default = "postgres"
}
variable "region" {
  default = "eu-west-1"
}
variable "workspace" {
  default = "develop"
}