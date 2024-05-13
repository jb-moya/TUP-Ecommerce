const formatData = (createdAtDate) => {
    return new Date(createdAtDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default formatData;