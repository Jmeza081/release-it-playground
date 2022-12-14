module.exports = function (Handlebars) {
    Handlebars.registerHelper('sortReleasesByDate', function (releases) {
        return releases.sort(function(a, b) {
            return new Date(b.isoDate) - new Date(a.isoDate);
        });
    });

    Handlebars.registerHelper('formatMessage', function (options) {
        const message = options.fn(this);

        const jiraTicketPart = message.match(/([CWP])\w+-[0-9]+/gi) || '';

        if(!jiraTicketPart) {
            return message; // No point in parsing if we aren't following conventions
        }
        console.log('message', message);
        console.log('jiraTicketPart', jiraTicketPart);
        const jiraTicketNumber = jiraTicketPart[0].match(/[0-9]+/gi) || '';
        console.log('jiraTicketNumber', jiraTicketNumber);
        const affectedComponent = message.match(/fix\((.*?)\))/gi) || '';
        console.log('affectedComponent', affectedComponent);


        return message;
    });
}
