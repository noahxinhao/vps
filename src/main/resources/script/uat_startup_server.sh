#!/usr/bin/expect
spawn ssh ubuntu@172.16.8.93
set timeout 300
expect "ubuntu@172.16.8.93's password: "
send "KRyApjBb\n"
expect "ubuntu@uat2:~$ "
send "cd /opt/apache-tomcat-7.0.42/webapps/ROOT/\n"
expect "ubuntu@uat2:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "jar -xvf ./juxinli.war\n"
expect "ubuntu@uat2:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "sudo /opt/apache-tomcat-7.0.42/bin/startup.sh\n"
expect "\\\[sudo\\\] password for ubuntu: "
send "KRyApjBb\n"

expect "ubuntu@uat2:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "sudo mv /home/ubuntu/nginx_uat.conf /opt/nginx/conf/nginx.conf\n"
expect "ubuntu@uat2:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "sudo /opt/nginx/sbin/nginx -s reload\n"
expect "ubuntu@uat2:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "exit\n"