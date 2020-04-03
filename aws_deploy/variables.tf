variable "az_count" {
  type    = number
  default = 2
}
variable "region" {
  type = string
  default = "eu-west-1"
}

variable "prefix" {
  type    = string
  default = "stam-acasa"
}

variable "env" {
  description = "environment DEV/Stage/Prod"
  default = "dev"
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
  default = "postgres:default"
}

