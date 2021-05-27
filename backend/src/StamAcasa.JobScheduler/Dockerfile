FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["StamAcasa.JobScheduler/StamAcasa.JobScheduler.csproj", "StamAcasa.JobScheduler/"]
COPY ["StamAcasa.Common/StamAcasa.Common.csproj", "StamAcasa.Common/"]
RUN dotnet restore "StamAcasa.Common/StamAcasa.Common.csproj"
RUN dotnet restore "StamAcasa.JobScheduler/StamAcasa.JobScheduler.csproj"
COPY . .
WORKDIR "/src/StamAcasa.JobScheduler"
RUN dotnet build "StamAcasa.JobScheduler.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StamAcasa.JobScheduler.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# install System.Drawing native dependencies
RUN apt-get update \
    && apt-get install -y --allow-unauthenticated \
        libc6-dev \
        libgdiplus \
        libx11-dev \
     && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["dotnet", "StamAcasa.JobScheduler.dll"]
