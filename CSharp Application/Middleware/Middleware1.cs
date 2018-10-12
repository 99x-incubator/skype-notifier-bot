using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;

namespace SkypeBotForCICD.Middleware
{
    public class Middleware1 : IMiddleware
    {
        public async Task OnTurnAsync(ITurnContext context, NextDelegate next, CancellationToken cancellationToken = default(CancellationToken))
        {
            await context.SendActivityAsync($"[SimpleMiddleware1] {context.Activity.Type}/OnTurn/Before");

            await next(cancellationToken);

            await context.SendActivityAsync($"[SimpleMiddleware1] {context.Activity.Type}/OnTurn/After");
        }
    }
}
