import min from "lodash/min";
import {getDates} from "../../../common/common";
import {sumBy} from "lodash";

export const analyticsHelper = {
    mapData: (analyticsData) => {
        let ret = [];
        let days = [];

        let startDate = new Date(min(analyticsData.map(a => new Date(a.date).getTime())));
        startDate.setHours(0, 0, 0 ,0);
        let endDate = new Date();
        endDate.setHours(23, 59, 59, 99);
        days = getDates(startDate, endDate);





        for (let i = 0; i < days.length; i++) {
            let day = days[i];
            let dataOfCurrent = [];

            for (let data of analyticsData) {

                let currentTimeStamp = new Date(day);
                currentTimeStamp.setHours(0, 0, 0, 0);

                let nextTimeStamp = new Date(day);
                nextTimeStamp.setHours(23, 59, 59, 99);

                if (currentTimeStamp < new Date(data.date).getTime() && new Date(data.date).getTime() < nextTimeStamp) {
                    dataOfCurrent.push(data);
                }
            }

            ret.push({
                date: day,
                data: dataOfCurrent
            })
        }



        return [{
            id: "income",
            values: ret.map((ret => ({
                date: ret.date,
                value: sumBy(ret.data.filter(r => r.income), r => r.money)
            })))
        }, {
            id: "outcome",
            values: ret.map((ret => ({
                date: ret.date,
                value: sumBy(ret.data.filter(r => !r.income), r => r.money)
            })))
        }];
    }

}
