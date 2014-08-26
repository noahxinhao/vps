#!/usr/bin/expect
spawn ssh ubuntu@54.64.78.135
set timeout 5
expect "ubuntu@web-2:~$"
send "cd /opt/script/"
expect "ubuntu@web-2:/opt/script$"
send "sudo ./start.sh"
expect "ubuntu@web-2:/opt/script$"
send "exit\n"