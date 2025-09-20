#!/bin/bash
cd /home/kavia/workspace/code-generation/music-center-student-registration-87320-87329/music_center_student_registration_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

