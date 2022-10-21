using System;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

class EmitLog
{
    static Random rnd = new Random();

    public static void Main(string[] args)
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };
        using(var connection = factory.CreateConnection())
        using(var channel = connection.CreateModel())
        {
            channel.ExchangeDeclare(exchange: "logs", type: ExchangeType.Fanout);


            do
            {
                var message = GetMessage(args);
                var body = Encoding.UTF8.GetBytes(message);
                channel.BasicPublish(exchange: "logs",
                                     routingKey: "",
                                     basicProperties: null,
                                     body: body);
                Console.WriteLine(" [x] Sent {0}", message);

                System.Threading.Thread.Sleep(200);
            } while (true);
        }
    }

    private static string GetMessage(string[] args)
    {
            string jsonString = JsonSerializer.Serialize<Event>(new Event {
                date = DateTime.Now,
                type = GetRandomEventType()
            });

        return jsonString;
    }

    private static string GetRandomEventType()
{
        string[] events = new string[] {
        "User logged in",
        "User logged out",
        "User modified their password",
        "User attempted",
        "User created a group",
        "User deleted a group",
        "User created a role", 
        "User deleted a role" 
        };
    return events[rnd.Next(0, events.Length)];
}
}


public class Event {
    public DateTime date { get; set; }
    public string type { get; set; } = "";
}