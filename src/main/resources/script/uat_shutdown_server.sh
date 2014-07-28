#!/usr/bin/expect
spawn ssh ubuntu@172.16.8.93
set timeout 300
expect "ubuntu@172.16.8.93's password: "
send "KRyApjBb\n"
expect "ubuntu@uat2:~$ "
send "sudo /opt/apache-tomcat-7.0.42/bin/shutdown.sh\n"
expect "\\\[sudo\\\] password for ubuntu: "
send "KRyApjBb\n"
expect "ubuntu@uat2:~$ "
send "exit\n"