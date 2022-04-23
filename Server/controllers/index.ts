
import express, {Request,Response,NextFunction} from 'express';
 

export function DisplayHomePage(req: Request, res: Response, next : NextFunction) : void
{

    res.render('index', { title: 'Home', page: 'home', messages: req.flash('ScheduleMessage')});
}

export function ProcessHomePage(req: Request, res: Response , next : NextFunction) : void
{
    let success = true;
    //Aliases
    let name = req.body.Name.trim();
    let date = req.body.Date.trim();
    let ScheduleType = req.body.ScheduleType.trim();
    let errorMessage = "";
    //Consider more efficient validation
    if(name == "")
    {
        success = false;
        errorMessage += "Please select your name\n";
    }

    if(date == "")
    {
        success = false;
        errorMessage += "Please select the date\n";

    }

    if(ScheduleType == "")
    {
        success = false;
        errorMessage += "Please select your schedule type";

    }
    if(success)
    {
        insertEvent(name,date,ScheduleType);
        req.flash('ScheduleMessage', 'Work schedule was added Successfully');
    }
    else
    {
        req.flash('ScheduleMessage', errorMessage);

    }
    //do this on success
    res.redirect('/home');
}



// Require google from googleapis package.
const { google } = require('googleapis');

const keys = require('../keys/client_secret');
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    SCOPES
);



async function insertEvent(Name : string ,ScheduleDate: string,ScheduleType : string) {
    
    //Varies
    // let Name = "Ethan";
    // let ScheduleDate = '2022-04-23';
    // let ScheduleType = 'D';
    //TODO: color vary by name
    //add a mini site for this


    //Never changes
    let Location = "2000 Meadowvale Rd, Toronto, ON M1B 5K7";
    let Description = Name + "'s work schedule for the day";
    let timeZone = 'America/Toronto';
    let startTime = '01:00:00';
    let endTime = '23:59:00';
    let offset = '-04:00';
    let color = 11;

    /*consider objects for schedule types*/
    //C 9-5:30
    if(ScheduleType == 'C')
    {
        startTime = '09:00:00';
        endTime = '17:30:00';
    }

    //B 8:30-5
    if(ScheduleType == 'B')
    {
        startTime = '08:30:00';
        endTime = '17:00:00';
    }
    //G 11-7:30
    if(ScheduleType == 'G')
    {
        startTime = '11:00:00';
        endTime = '19:30:00';
    }

    //D 9:30-6
    if(ScheduleType == 'D')
    {
        startTime = '09:30:00';
        endTime = '18:00:00';
    }


    //Early 6-2:30
    if(ScheduleType == 'E')
    {
        startTime = '06:00:00';
        endTime = '14:30:00';
    }

    //Late 8-4:30
    if(ScheduleType == 'L')
    {
        startTime = '08:00:00';
        endTime = '16:30:00';
    }

    if(Name == 'Ethan')
    {
        color = 8;
    }

    if(Name == 'Elizabeth')
    {
        color = 4;
    }

    if(Name == 'Jasmin')
    {
        color = 1;
    }

    if(Name == 'Seth')
    {
        color = 7;
    }

    let event = {
        'summary': Name + "'s Schedule",
        'location': Location,
        'description': Description,
        colorId: color,
        'start': {
          'dateTime': ScheduleDate + 'T' + startTime + offset,
          'timeZone': timeZone
        },
        'end': {
            'dateTime': ScheduleDate + 'T' + endTime + offset,
            'timeZone': timeZone
        }
      };


    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: keys.calendarID,
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};