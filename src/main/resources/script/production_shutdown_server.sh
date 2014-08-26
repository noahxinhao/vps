#!/usr/bin/expect
#ipArray=(54.64.46.201 54.64.78.135 54.64.79.0 54.64.79.4);
ipArray=(54.64.78.135);
for data in ${ipArray[@]}
do
   spawn ssh ubuntu@${data}
   set timeout 300
   expect "ubuntu@webapp:~$ "
   send "sudo /opt/apache-tomcat-8.0.9/bin/shutdown.sh\n"
   send "sudo rm -fr /opt/apache-tomcat-8.0.9/webapps/ROOT/*\n"
   send "sudo cp ~/vps.war /opt/apache-tomcat-8.0.9/webapps/ROOT/"
   send "cd /opt/apache-tomcat-8.0.9/webapps/ROOT/"
   send "sudo jar -xvf vps.war"
   send "cd ../../"
   send "sudo ./startup.sh"
   send "exit\n"
done

