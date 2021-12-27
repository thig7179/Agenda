var appointment = require('../models/Appointment');
var mongoose = require('mongoose');
var AppointmentFactory = require('../factories/AppointmentFactory');

const Appo = mongoose.model('Appointment', appointment);

class AppointmentService {

    async Create(name, description, email, date, time ){
        var newAppo = new Appo({
            name,
            description,
            email,
            date,
            time,
            finished: false
        });
        try {
            await newAppo.save();
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
        
    }
    async GetAll(showFinished){

        if(showFinished){
            return await Appo.find();
        }else{
            var appos =  await Appo.find({'finished': false});
            var appointments = [];

            appos.forEach(appointment => {
                if(appointment.date != undefined){
                    appointments.push(AppointmentFactory.Build(appointment));
                }
                
            });

            return appointments;
        }
    }
    async GetById(id) {
        try{
            var event = await Appo.findOne({'_id': id});
            return event;
        }catch(err){
            console.log(err);
        }
        
    }
    async FinishedId(id){
        try{
            await Appo.findByIdAndUpdate(id,{finished:true});
            return true;
        }catch(err){
            console.log(err);
            return false;

        }
        
    }

}
module.exports =  new AppointmentService();