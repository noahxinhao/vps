#!/bin/bash
echo -e "begin to deploy vps"
echo -e "change to application dir"
cd /opt/war/vps
echo -e "pull update from github"
git pull origin
echo -e "package this application"
mvn package -Pproduction
echo -e "delete file from ROOT"
cd /opt/apache-tomcat-8.0.9/webapps/ROOT
sudo rm -rf *
echo -e "copy vps.war to ROOT"
cp /opt/war/vps/target/vps.war .
echo -e "unpackage war file"
jar -xvf vps.war
echo -e "restart server"
cd ../../bin
./shutdown
sudo ./start
