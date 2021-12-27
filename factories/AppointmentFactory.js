class AppointmentFactory{

    Build(consultaSimples){
        var day = consultaSimples.date.getDate()+1;
        var month = consultaSimples.date.getMonth();
        var year = consultaSimples.date.getFullYear();
        var hour = Number.parseInt(consultaSimples.time.split(":")[0]);
        var minute = Number.parseInt(consultaSimples.time.split(":")[1]);

        var startDate = new Date(year, month, day, hour, minute,0,0);

        var appo = {
            id: consultaSimples._id,
            title: consultaSimples.name +" - "+ consultaSimples.description,
            start: startDate,
            end: startDate
        }
        return appo;
    }
}

module.exports = new AppointmentFactory();