using CICD_SkypeBot;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Bot.Builder.BotFramework;
using Microsoft.Bot.Builder.Integration.AspNet.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using Microsoft.Bot.Builder;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;

public class Startup
{
    // Inject the IHostingEnvironment into constructor
    public Startup(IHostingEnvironment env)
    {
        // Set the root path
        ContentRootPath = env.ContentRootPath;

    }

    // Track the root path so that it can be used to setup the app configuration
    public string ContentRootPath { get; private set; }
    //public static IConfigurationRoot Configuration { get; set; }
    public void ConfigureServices(IServiceCollection services, IHostingEnvironment env)
    {
        // Set up the service configuration
        var builder = new ConfigurationBuilder()
            .SetBasePath(ContentRootPath)
            .AddJsonFile("appsettings.json")
            .AddEnvironmentVariables();

        var configuration = builder.Build();

        services.AddSingleton(configuration);

        //services.AddAuthentication(options =>
        //{
        //    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        //    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        //    options.DefaultChallengeScheme = "GitHub";
        //})
        //.AddCookie()
        //.AddOAuth("GitHub", options =>
        //{
        //    options.ClientId = Configuration["GitHub:ClientId"];
        //    options.ClientSecret = Configuration["GitHub:ClientSecret"];
        //    options.CallbackPath = new PathString("/signin-github");

        //    options.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
        //    options.TokenEndpoint = "https://github.com/login/oauth/access_token";
        //    options.UserInformationEndpoint = "https://api.github.com/user";

        //    options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
        //    options.ClaimActions.MapJsonKey(ClaimTypes.Name, "name");
        //    options.ClaimActions.MapJsonKey("urn:github:login", "login");
        //    options.ClaimActions.MapJsonKey("urn:github:url", "html_url");
        //    options.ClaimActions.MapJsonKey("urn:github:avatar", "avatar_url");

        //    options.Events = new OAuthEvents
        //    {
        //        OnCreatingTicket = async context =>
        //        {
        //            var request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
        //            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);

        //            var response = await context.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, context.HttpContext.RequestAborted);
        //            response.EnsureSuccessStatusCode();

        //            var user = JObject.Parse(await response.Content.ReadAsStringAsync());

        //            context.RunClaimActions(user);
        //        }
        //    };
        //});
        //// Add your SimpleBot to your application
        //services.AddBot<RichCardsBot>(options =>
        //{
        //    options.CredentialProvider = new ConfigurationCredentialProvider(configuration);
        //});


    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
        app.UseStaticFiles();
        //app.UseAuthentication();
        // Tell your application to use Bot Framework
        app.UseBotFramework();
    }

    //public static void SetOAuth2Options(OAuthOptions options)
    //{
    //    options.ClientId = Configuration["Github:ClientId"];// "f6e86b4db35459285385";
    //    options.ClientSecret = Configuration["Github:ClientId"];// "e5dd20adad546f991c81efa2a497e31c0879039e";
    //    options.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
    //    options.TokenEndpoint = "https://github.com/login/oauth/access_token";
    //    options.UserInformationEndpoint = "https://api.github.com/user";
    //    options.CallbackPath = new PathString("/signin_github");

    //    // Set the scopes you want to request
    //    options.Scope.Add("user-read");
    //    options.Scope.Add("user-write");

    //    // Define how to map returned user data to claims
    //    options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "UserId");
    //    options.ClaimActions.MapJsonKey(ClaimTypes.Email, "EmailAddress", ClaimValueTypes.Email);
    //    options.ClaimActions.MapJsonKey(ClaimTypes.Name, "Name");

    //    // Register to events
    //    options.Events = new OAuthEvents
    //    {
    //        // After OAuth2 has authenticated the user
    //        OnCreatingTicket = async context =>
    //        {
    //            // Create the request message to get user data via the backchannel
    //            var request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
    //            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);

    //            // Additional header if needed. Here's an example to go through Azure API Management 
    //            request.Headers.Add("Ocp-Apim-Subscription-Key", "<given key>");

    //            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

    //            // Query for user data via backchannel
    //            var response = await context.Backchannel.SendAsync(request, context.HttpContext.RequestAborted);
    //            response.EnsureSuccessStatusCode();

    //            // Parse user data into an object
    //            var user = JObject.Parse(await response.Content.ReadAsStringAsync());

    //            // Store the received authentication token somewhere. In a cookie for example
    //            context.HttpContext.Response.Cookies.Append("token", context.AccessToken);

    //            // Execute defined mapping action to create the claims from the received user object
    //            context.RunClaimActions(JObject.FromObject(user));
    //        },
    //        OnRemoteFailure = context =>
    //        {
    //            context.HandleResponse();
    //            context.Response.Redirect("/Home/Error?message=" + context.Failure.Message);
    //            return Task.FromResult(0);
    //        }
    //    };
    //}
}