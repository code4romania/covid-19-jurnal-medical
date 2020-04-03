output "NAT_Egress_Elastic_IP" {
  value = aws_eip.private.*.public_ip
}
/*
output "DNS" {
  value = module.load-balancer.dns
}
*/


