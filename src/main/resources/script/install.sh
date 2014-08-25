#!/bin/bash
echo -e "******************install java**************** "
sudo apt-get install default-jdk
echo -e "******************mkdir software***************** "
cd ../
sudo mkdir software
cd software
echo -e "******************download tomcat*****************"
sudo wget mirrors.hust.edu.cn/apache/tomcat/tomcat-8/v8.0.9/bin/apache-tomcat-8.0.9.tar.gz
echo -e "******************unpackage tomcat*****************"
sudo tar -xvf apache-tomcat-8.0.9.tar.gz
echo -e "***************mv to opt************************"
sudo mv -f apache-tomcat-8.0.9 ../
