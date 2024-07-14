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

export async function getLoanFilter(formData: string) {
    const response = await fetch(localPath + "lending/filter", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status == 400) {
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }
    const data = await response.json();
    return data;
}

export async function getLoan(id: string) {
    const response = await fetch(localPath + "lending/self/" + id, {
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

export async function changeStatus(status: string, id: string) {
    const response = await fetch(localPath + "lending/status/" + id, {
        method: "POST",
        body: JSON.stringify({ status }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status == 400) {
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }
    const data = await response.json();
    return data;
}

export async function addLoan(formData: string) {
    const response = await fetch(localPath + "lending", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status == 400) {
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }
    const data = await response.json();
    return data;
}
