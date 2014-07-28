#!/usr/bin/expect
spawn ssh ubuntu@172.16.8.92
set timeout 300
expect "ubuntu@172.16.8.92's password: "
send "Kxs3UpPsJu62\n"
expect "ubuntu@ubuntu:~$ "
send "cd /opt/apache-tomcat-7.0.42/webapps/ROOT/\n"
expect "ubuntu@ubuntu:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "jar -xvf ./juxinli.war\n"
expect "ubuntu@ubuntu:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "sudo /opt/apache-tomcat-7.0.42/bin/startup.sh\n"
expect "\\\[sudo\\\] password for ubuntu: "
send "Kxs3UpPsJu62\n"
send "exit\n"