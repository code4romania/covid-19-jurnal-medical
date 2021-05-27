// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.ComponentModel.DataAnnotations;

namespace IdentityServer.Quickstart.Account
{
    public class LoginInputModel
    {
        [Required(ErrorMessage = "Te rugăm completează numele de utilizator")]
        [EmailAddress(ErrorMessage = "Adresa de e-mail nu este validă.")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Te rugăm să completezi parola")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public bool RememberLogin { get; set; }
        public string ReturnUrl { get; set; }
    }
}