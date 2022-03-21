FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /Backend/Airlines_WebApp
COPY ["Airlines_WebApp.csproj", ""]
RUN dotnet restore "./Airlines_WebApp.csproj"
COPY . .
WORKDIR /Backend/Airlines_WebApp/.
RUN dotnet build "Airlines_WebApp.csproj" -c Release -o /app/build
FROM build AS publish
RUN dotnet publish "Airlines_WebApp.csproj" -c Release -o /app/publish
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DotNetAngular.dll"]