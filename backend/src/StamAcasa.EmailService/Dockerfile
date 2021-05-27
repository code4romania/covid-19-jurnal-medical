FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["StamAcasa.EmailService/StamAcasa.EmailService.csproj", "StamAcasa.EmailService/"]
COPY ["StamAcasa.Common/StamAcasa.Common.csproj", "StamAcasa.Common/"]
RUN dotnet restore "StamAcasa.Common/StamAcasa.Common.csproj"
RUN dotnet restore "StamAcasa.EmailService/StamAcasa.EmailService.csproj"
COPY . .
WORKDIR "/src/StamAcasa.EmailService"
RUN dotnet build "StamAcasa.EmailService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StamAcasa.EmailService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "StamAcasa.EmailService.dll"]