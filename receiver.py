# @author Nathan Murray
# @url mason.gmu.edu/~blane3/theforce/becomeijedi.html
# @lastupdated 2014-04-28
# @version 1.0.0
# @comments receiver program

#For python 2.7
import urllib
import socket
import create

socket.setdefaulttimeout(0.5)

prevSpeed = 0
prevTurnSpeed = 0

#CREATE THE ROBOT HERE
robot=create.Create(3)
robot.toFullMode()



while True:
	try:
		f = urllib.urlopen('http://nathanspc.noip.me')
		speed = f.info().getheader('Speed')
		speed = int(speed)
		turnSpeed = f.info().getheader('TurnSpeed')
		turnSpeed = int(turnSpeed)
		if speed != prevSpeed or turnSpeed != prevTurnSpeed:
			#ENTER ROBOT MOVE INFO HERE
			robot.go(speed,turnSpeed)
			print('Move speed: ' + str(speed) + ' Turn speed: ' + str(turnSpeed))
		prevSpeed = speed
		prevTurnSpeed = turnSpeed                  
	except IOError:
		robot.go(0,0)
		prevSpeed = 0
		prevTurnSpeed = 0
		print('Timeout, reconnecting')

	
	
	