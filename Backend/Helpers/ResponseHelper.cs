namespace Backend.Helpers;

public static class ResponseHelper
{
    public static object Success(object data, string message = "Operación realizada correctamente")
    {
        return new { success = true, message, data };
    }

    public static object Failure(string message)
    {
        return new { success = false, message };
    }
}
