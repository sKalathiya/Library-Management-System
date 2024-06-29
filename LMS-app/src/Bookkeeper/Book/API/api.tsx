const localPath = "http://localhost:8080/";

export async function getBooks() {
    const response = await fetch(localPath + "book", {
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

export async function getBook(id: string) {
    const response = await fetch(localPath + "book/" + id, {
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

export async function getBookKeeper(id: string) {
    const response = await fetch(localPath + "user/" + id, {
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

export async function updateBook(formData: FormData, id: string) {
    const response = await fetch(localPath + "book/update/" + id, {
        method: "POST",
        body: formData,
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

export async function addBook(formData: FormData) {
    const response = await fetch(localPath + "book/add", {
        method: "POST",
        body: formData,
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

export async function deleteBook(id: string) {
    const response = await fetch(localPath + "book/" + id, {
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

export async function filterBooks(formData: FormData) {
    const response = await fetch(localPath + "book/filter", {
        method: "POST",
        body: formData,
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
