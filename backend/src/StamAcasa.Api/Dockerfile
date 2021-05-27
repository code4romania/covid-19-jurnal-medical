#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
RUN apt-get update && apt-get install -y libgdiplus libc6-dev && ln -s /usr/lib/libgdiplus.so /usr/lib/gdiplus.dll
WORKDIR /app
EXPOSE 80 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["StamAcasa.Api/StamAcasa.Api.csproj", "StamAcasa.Api/"]
COPY ["StamAcasa.Common/StamAcasa.Common.csproj", "StamAcasa.Common/"]
RUN dotnet restore "StamAcasa.Common/StamAcasa.Common.csproj"
RUN dotnet restore "StamAcasa.Api/StamAcasa.Api.csproj"
COPY . .
WORKDIR "/src/StamAcasa.Api"
RUN dotnet build "StamAcasa.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StamAcasa.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY ["StamAcasa.Api/StamAcasa.Api.xml", "StamAcasa.Api.XML"]
COPY --from=publish /app/publish .

RUN chmod -R 1744 /app

ENTRYPOINT ["dotnet", "StamAcasa.Api.dll"]