output "DNS_FrontEnd" {
  value = "https://${module.front-end_dns.fqdn}"
}

output "DNS_IdentityServer" {
  value = "https://${module.identitysrv_dns.fqdn}"
}
output "DNS_PostGres" {
  value = "https://${module.postgres_dns.fqdn}"
}

output "DNS_EmailService" {
  value = "https://${module.emailservice_dns.fqdn}"
}

output "DNS_JobScheduler" {
  value = "https://${module.jobscheduler_dns.fqdn}"
}

output "DNS_API" {
  value = "https://${module.api_dns.fqdn}"
}

output "LB_FrontEnd" {
  value = module.front-end.dns
}

output "LB_API" {
  value = module.api.dns
}
