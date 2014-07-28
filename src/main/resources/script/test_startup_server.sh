#!/usr/bin/expect
spawn ssh ubuntu@172.16.8.182
set timeout 300
expect "ubuntu@172.16.8.182's password: "
send "NX6CrXNnWzQE\n"
expect "ubuntu@ubuntu:~$ "
send "cd /opt/apache-tomcat-7.0.42/webapps/ROOT/\n"
expect "ubuntu@ubuntu:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "sudo jar -xvf ./juxinli.war\n"
expect "\\\[sudo\\\] password for ubuntu: "
send "NX6CrXNnWzQE\n"
expect "ubuntu@ubuntu:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "sudo /opt/apache-tomcat-7.0.42/bin/startup.sh\n"
expect "ubuntu@ubuntu:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "sudo mv /home/ubuntu/nginx_test.conf /opt/nginx/conf/nginx.conf\n"
expect "ubuntu@ubuntu:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "sudo /opt/nginx/sbin/nginx -s reload\n"
expect "ubuntu@ubuntu:/opt/apache-tomcat-7.0.42/webapps/ROOT$ "
send "exit\n"