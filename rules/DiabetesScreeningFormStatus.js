const {RuleFactory, FormElementStatusBuilder, FormElementsStatusHelper, FormElementStatus} = require('rules-config/rules');
const filter = RuleFactory('01ac5ce7-9b2d-46e9-a235-147441fa8059', 'ViewFilter');
const RuleHelper = require('./RuleHelper');

@filter('dd40042f-cdb2-4e59-90a0-c5143c436bcd', 'Skip logic for ', 100.0)
class DiabetesScreeningFormStatus {
    static exec(programEnrolment, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new DiabetesScreeningFormStatus(), programEnrolment, formElementGroup, today);
    }

    randomBloodGlucoseSugar(programEnrolment, formElement) {
        return RuleHelper.encounterCodedObsHas(programEnrolment, formElement, "Diabetes test used", "Random blood glucose/sugar");
    }

    fastingBloodGlucoseSugar(programEnrolment, formElement) {
        return RuleHelper.encounterCodedObsHas(programEnrolment, formElement, "Diabetes test used", "Fasting blood glucose/sugar");
    }

    oralGlucoseToleranceTest(programEnrolment, formElement) {
        return RuleHelper.encounterCodedObsHas(programEnrolment, formElement, "Diabetes test used", "Oral glucose tolerance test");
    }

    hba1C(programEnrolment, formElement) {
        return RuleHelper.encounterCodedObsHas(programEnrolment, formElement, "Diabetes test used", "HBA1c");
    }
}

module.exports = DiabetesScreeningFormStatus;