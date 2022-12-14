module.exports = function (Handlebars) {
    Handlebars.registerHelper('sortReleasesByDate', function (releases) {
        return releases.sort(function(a, b) {
            return new Date(b.isoDate) - new Date(a.isoDate);
        });
    });

    Handlebars.registerHelper('formatMessage', function (options) {
        const message = options.fn(this);

        const jiraTicketPart = message.match(/\[([CWP])\w+-[0-9]+\]/gi) || '';
        console.log('jiraTicketPart', jiraTicketPart);

        if(!jiraTicketPart) {
            return message; // No point in parsing if we aren't following conventions
        }

        return message;
    });
}
