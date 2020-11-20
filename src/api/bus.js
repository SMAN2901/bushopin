import http from "../services/httpService";

var apiUrl = "https://sman2901.pythonanywhere.com/api";

var config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export async function searchBus(start, end) {
    // if data already stored in local storage then ue that data
    var data = localStorage.getItem("data");
    if (data) {
        data = JSON.parse(data);
        if (data.length > 0) {
            if (data[0].start === start && data[0].end === end) return { data };
        }
    }

    // otherwise get data from backend api
    var url = `${apiUrl}/trips/${start}/${end}`;
    var response = await http.get(url, config);
    localStorage.setItem("data", JSON.stringify(response.data));
    return response;
}

export function bookSeat(data) {
    var buses = JSON.parse(localStorage.getItem("data"));
    if (data) {
        var { index, code } = data;
        // geting seatindex from seat code
        var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var i = alpha.indexOf(code[0]);
        var j = parseInt(code[2]) - 1;
        var seat = buses[index].seats[i][j];

        if (seat !== "AVAILABLE")
            return { success: false, message: "Seat is not available" };
        buses[index].seats[i][j] = "BOOKED";
        localStorage.setItem("data", JSON.stringify(buses));
        return { success: true, message: "Seat booked" };
    }
}

export function unbookSeat(data) {
    var buses = JSON.parse(localStorage.getItem("data"));
    if (data) {
        var { index, code } = data;
        // geting seatindex from seat code
        var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var i = alpha.indexOf(code[0]);
        var j = parseInt(code[2]) - 1;
        var seat = buses[index].seats[i][j];

        if (seat !== "BOOKED")
            return { success: false, message: "Seat is not booked" };
        buses[index].seats[i][j] = "AVAILABLE";
        localStorage.setItem("data", JSON.stringify(buses));
        return { success: true, message: "Seat released" };
    }
}

export function purchaseTicket(data) {
    var buses = JSON.parse(localStorage.getItem("data"));
    if (data) {
        var { index, code, gender } = data;
        // geting seatindex from seat code
        var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var i = alpha.indexOf(code[0]);
        var j = parseInt(code[2]) - 1;
        var adj = [1, 0, 3, 2];

        if (gender === "M" && buses[index].seats[i][adj[j]] === "SOLD (F)") {
            return {
                success: false,
                message: "Select a seat without adjacent female passender",
            };
        }

        buses[index].seats[i][j] = `SOLD (${gender})`;
        localStorage.setItem("data", JSON.stringify(buses));
        return { success: true, message: "Ticket purchased" };
    }
}
