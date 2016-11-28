// const PolicyFactory = require('cyanide-policy').PolicyFactory

/** Class for Request Validator */
class BaseValidator {

	/**
	 * Initialize the validator
	 * @param  {Object}
	 * @param  {Array} policy_conf, Policies
	 */
	constructor(opt) {
		this.policyFactory = opt.policyFactory
	}

	/**
	 * @attribute policy_conf
	 */
	get policy_conf() {
		throw new Error('Unimplemented')
	}

	/**
	 * @attribute policies
	 */
	get policies() {
		var policy_list = []
		this.policy_conf.forEach((policy)=>{
			policy_list.push(this.policyFactory.build(policy))
		})
		return policy_list
	}

	before() {
		return this
	}

	after() {
		return this
	}

	/**
	 * Run checks all policies
	 * @return {[type]} [description]
	 */
	run() {
		this.policies.forEach((policy, index) => {
			policy.approve(this)
		})
		return this	
	}

	validate(obj) {
		return this
			.before()
			.run()
			.after()
			.done()
	}

	/**
	 * check if request needs authentication
	 * @param  {request}
	 * @return {this}
	 */
	done()	{
		throw new Error('Unimplemented')
	}

}

module.exports = BaseValidator;