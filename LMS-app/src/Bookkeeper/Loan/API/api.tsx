const localPath = "http://localhost:8080/";

export async function getTodaysLoan() {
    const response = await fetch(localPath + "lending/dailyLendings", {
        method: "GET",
        credentials: "include",
    });
    if (response.status == 400) {
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }
    const data = await response.json();
    return data;
}
