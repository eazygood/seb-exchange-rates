export const getDateWithoutTime = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
}
