const localPath = "http://localhost:8080/";

export async function updateUser(formData: string, id: string) {
    const response = await fetch(localPath + "myProfile/update/" + id, {
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

export async function getUserProfile(id: string) {
    const response = await fetch(localPath + "myProfile/" + id, {
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

export async function deleteProfile(id: string) {
    const response = await fetch(localPath + "myProfile/" + id, {
        method: "DELETE",
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
