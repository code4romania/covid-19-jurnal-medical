#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["StamAcasa.IdentityServer/StamAcasa.IdentityServer.csproj", "StamAcasa.IdentityServer/"]
COPY ["StamAcasa.Common/StamAcasa.Common.csproj", "StamAcasa.Common/"]
RUN dotnet restore "StamAcasa.Common/StamAcasa.Common.csproj"
RUN dotnet restore "StamAcasa.IdentityServer/StamAcasa.IdentityServer.csproj"
COPY . .

WORKDIR "/src/StamAcasa.IdentityServer"
RUN dotnet build "StamAcasa.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StamAcasa.IdentityServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

RUN chmod -R 1744 /app

ENTRYPOINT ["dotnet", "StamAcasa.IdentityServer.dll"]