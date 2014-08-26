#!/bin/bash
echo -e "##########begin to deploy vps###########"
cd /opt/war/vps
echo -e "##########pull update from github##########"
sudo git pull origin
echo -e "##########package this application#########"
sudo mvn package -Ppro
echo -e "##########delete file from ROOT###########"
cd /opt/apache-tomcat-8.0.9/webapps/ROOT
sudo rm -rf *
echo -e "############copy vps.war to ROOT###########"
sudo cp /opt/war/vps/target/vps.war .
echo -e "#############unpackage war file############"
sudo jar -xvf vps.war
echo -e "#############restart server#############"
cd ../../bin
sudo ./shutdown.sh
sudo ./startup.sh
echo -e "#############update nginx file #############"
sudo cp -rf /opt/apache-tomcat-8.0.9/webapps/ROOT /opt/nfs/
echo -e "############begin deploy other application web[1,2,3,4]##############"
ipArray=(54.64.46.201 54.64.78.135 54.64.79.0 54.64.79.4);
for data in ${ipArray[@]}
do
   echo "/opt/war/vps/target/vps.war ubuntu@${data}:~/"
   scp /opt/war/vps/target/vps.war ubuntu@${data}:~/;
   ssh ubuntu@${data} "sudo /opt/script/start.sh"
   continue;
done

#部署tomcat脚本
cd /opt/apache-tomcat-8.0.9/bin/
sudo ./shutdown.sh
cd ../webapps/ROOT
sudo rm -rf *
sudo cp -f ~/vps.war .
sudo jar -xvf vps.war
cd ../../bin
sudo ./startup.sh
