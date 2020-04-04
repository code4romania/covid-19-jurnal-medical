output "NAT_Egress_Elastic_IP" {
  value = aws_eip.private.*.public_ip
}

output "DNS Front-End" {
  value = module.front-end.dns
}

output "DNS API" {
  value = module.api.dns
}

output "DNS identitysrv" {
  value = module.identitysrv.dns
}

output "DNS Postgres" {
  value = module.postgres.dns
}
