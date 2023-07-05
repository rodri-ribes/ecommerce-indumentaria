export default function upperCase(string) {

    if (string.includes(" ")) {
        let arr = string.split(" ");

        let resp = "";

        arr.forEach((e, i) => {
            resp += e.charAt(0).toUpperCase() + e.slice(1);
            if (arr.length !== i + 1) resp += " "
        });

        return resp
    } else {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}
