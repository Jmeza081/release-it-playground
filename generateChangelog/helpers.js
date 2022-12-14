module.exports = function (Handlebars) {
    Handlebars.registerHelper('sortReleasesByDate', function (releases) {
        return releases.sort(function(a, b) {
            return new Date(b.isoDate) - new Date(a.isoDate);
        });
    });

    Handlebars.registerHelper('formatMessage', function (options) {
        const message = options.fn(this);

        const jiraTicketPart = message.match(/([CWP])\w+-[0-9]+/gi) || '';

        if(!jiraTicketPart || message.indexOf(jiraTicketPart[0]) !== 0) {
            return message; // No point in parsing if we aren't following conventions
        }

        const jiraTicketNumber = jiraTicketPart[0].match(/[0-9]+/gi) || '';
        const affectedComponent = message.match(/([a-z])\w+\([a-z]+\)/gi) || '';

        const componentName = affectedComponent
            ? affectedComponent[0].substring(
                    affectedComponent[0].indexOf('(')+1, affectedComponent[0].indexOf(')')
                ) + ' ' // add space in end for better view in message
            : '';

        const clearMessage = message.replace(jiraTicketPart, '').replace(affectedComponent, '').replace(/^[^A-Za-z]+/, '');
        if (clearMessage === '') {
            return message; // No need empty message
        }

        const generateMessage = `[CWP-${jiraTicketNumber[0]}] ${componentName}- ${clearMessage}`

        return generateMessage;
    });
}
