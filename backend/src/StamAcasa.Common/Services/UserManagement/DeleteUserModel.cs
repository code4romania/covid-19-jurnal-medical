namespace StamAcasa.Common.Services.UserManagement
{
    public class DeleteUserModel
    {
        public string Sub { get; }

        public DeleteUserModel(string sub)
        {
            Sub = sub;
        }
    }
}
