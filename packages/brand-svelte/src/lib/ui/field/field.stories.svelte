<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Checkbox } from '$brand/ui/checkbox/index.js'
	import { Input } from '$brand/ui/input/index.js'
	import { RadioGroup, RadioGroupItem } from '$brand/ui/radio-group/index.js'
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$brand/ui/select/index.js'
	import { Slider } from '$brand/ui/slider/index.js'
	import { Switch } from '$brand/ui/switch/index.js'
	import { Textarea } from '$brand/ui/textarea/index.js'
	import FieldRoot from './field.svelte'
	import FieldContent from './field-content.svelte'
	import FieldDescription from './field-description.svelte'
	import FieldGroup from './field-group.svelte'
	import FieldLabel from './field-label.svelte'
	import FieldLegend from './field-legend.svelte'
	import FieldSeparator from './field-separator.svelte'
	import FieldSet from './field-set.svelte'
	import FieldTitle from './field-title.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Field',
		component: FieldRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	let price = $state([200, 800])
</script>

<Story name="WithInput" asChild>
	<div class="w-full min-w-sm max-w-md">
		<FieldSet>
			<FieldGroup>
				<FieldRoot>
					<FieldLabel for="username">Username</FieldLabel>
					<Input id="username" type="text" placeholder="Max Leiter" />
					<FieldDescription>Choose a unique username for your account.</FieldDescription>
				</FieldRoot>
			</FieldGroup>
		</FieldSet>
	</div>
</Story>

<Story name="WithTextarea" asChild>
	<div class="w-full min-w-sm max-w-md">
		<FieldSet>
			<FieldGroup>
				<FieldRoot>
					<FieldLabel for="feedback">Feedback</FieldLabel>
					<Textarea id="feedback" placeholder="Your feedback helps us improve..." rows={4} />
					<FieldDescription>Share your thoughts about our service.</FieldDescription>
				</FieldRoot>
			</FieldGroup>
		</FieldSet>
	</div>
</Story>

<Story name="WithSelect" asChild>
	<div class="w-full min-w-sm max-w-md">
		<FieldRoot>
			<FieldLabel>Department</FieldLabel>
			<Select type="single">
				<SelectTrigger>
					<SelectValue placeholder="Choose department" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="engineering">Engineering</SelectItem>
					<SelectItem value="design">Design</SelectItem>
					<SelectItem value="marketing">Marketing</SelectItem>
					<SelectItem value="sales">Sales</SelectItem>
					<SelectItem value="support">Customer Support</SelectItem>
					<SelectItem value="hr">Human Resources</SelectItem>
					<SelectItem value="finance">Finance</SelectItem>
					<SelectItem value="operations">Operations</SelectItem>
				</SelectContent>
			</Select>
			<FieldDescription>Select your department or area of work.</FieldDescription>
		</FieldRoot>
	</div>
</Story>

<Story name="WithSlider" asChild>
	<div class="w-full min-w-sm max-w-md">
		<FieldRoot>
			<FieldTitle>Price Range</FieldTitle>
			<FieldDescription>
				Set your budget range ($<span class="font-medium tabular-nums">{price[0]}</span> -
				<span class="font-medium tabular-nums">{price[1]}</span>).
			</FieldDescription>
			<Slider
				type="multiple"
				bind:value={price}
				max={1000}
				min={0}
				step={10}
				class="mt-2 w-full"
				aria-label="Price Range"
			/>
		</FieldRoot>
	</div>
</Story>

<Story name="WithFieldset" asChild>
	<div class="w-full min-w-sm max-w-md">
		<div class="w-full max-w-md space-y-6">
			<FieldSet>
				<FieldLegend>Address Information</FieldLegend>
				<FieldDescription>We need your address to deliver your order.</FieldDescription>
				<FieldGroup>
					<FieldRoot>
						<FieldLabel for="street">Street Address</FieldLabel>
						<Input id="street" type="text" placeholder="123 Main St" />
					</FieldRoot>
					<div class="grid grid-cols-2 gap-4">
						<FieldRoot>
							<FieldLabel for="city">City</FieldLabel>
							<Input id="city" type="text" placeholder="New York" />
						</FieldRoot>
						<FieldRoot>
							<FieldLabel for="zip">Postal Code</FieldLabel>
							<Input id="zip" type="text" placeholder="90502" />
						</FieldRoot>
					</div>
				</FieldGroup>
			</FieldSet>
		</div>
	</div>
</Story>

<Story name="WithCheckbox" asChild>
	<div class="w-full min-w-sm max-w-md">
		<FieldGroup>
			<FieldSet>
				<FieldLegend variant="label">Show these items on the desktop</FieldLegend>
				<FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
				<FieldGroup class="gap-3">
					<FieldRoot orientation="horizontal">
						<Checkbox id="finder-pref-9k2-hard-disks-ljj" />
						<FieldLabel for="finder-pref-9k2-hard-disks-ljj" class="font-normal">Hard disks</FieldLabel>
					</FieldRoot>
					<FieldRoot orientation="horizontal">
						<Checkbox id="finder-pref-9k2-external-disks-1yg" />
						<FieldLabel for="finder-pref-9k2-external-disks-1yg" class="font-normal">External disks</FieldLabel>
					</FieldRoot>
					<FieldRoot orientation="horizontal">
						<Checkbox id="finder-pref-9k2-cds-dvds-fzt" />
						<FieldLabel for="finder-pref-9k2-cds-dvds-fzt" class="font-normal">CDs, DVDs, and iPods</FieldLabel>
					</FieldRoot>
					<FieldRoot orientation="horizontal">
						<Checkbox id="finder-pref-9k2-connected-servers-6l2" />
						<FieldLabel for="finder-pref-9k2-connected-servers-6l2" class="font-normal">Connected servers</FieldLabel>
					</FieldRoot>
				</FieldGroup>
			</FieldSet>
			<FieldSeparator />
			<FieldRoot orientation="horizontal">
				<Checkbox id="finder-pref-9k2-sync-folders-nep" checked={true} />
				<FieldContent>
					<FieldLabel for="finder-pref-9k2-sync-folders-nep">Sync Desktop & Documents folders</FieldLabel>
					<FieldDescription>
						Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other devices.
					</FieldDescription>
				</FieldContent>
			</FieldRoot>
		</FieldGroup>
	</div>
</Story>

<Story name="WithRadio" asChild>
	<div class="w-full min-w-sm max-w-md">
		<FieldSet>
			<FieldLabel>Subscription Plan</FieldLabel>
			<FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
			<RadioGroup value="monthly">
				<FieldRoot orientation="horizontal">
					<RadioGroupItem value="monthly" id="plan-monthly" />
					<FieldLabel for="plan-monthly" class="font-normal">Monthly ($9.99/month)</FieldLabel>
				</FieldRoot>
				<FieldRoot orientation="horizontal">
					<RadioGroupItem value="yearly" id="plan-yearly" />
					<FieldLabel for="plan-yearly" class="font-normal">Yearly ($99.99/year)</FieldLabel>
				</FieldRoot>
				<FieldRoot orientation="horizontal">
					<RadioGroupItem value="lifetime" id="plan-lifetime" />
					<FieldLabel for="plan-lifetime" class="font-normal">Lifetime ($299.99)</FieldLabel>
				</FieldRoot>
			</RadioGroup>
		</FieldSet>
	</div>
</Story>

<Story name="WithSwitch" asChild>
	<div class="w-full min-w-sm max-w-md">
		<FieldRoot orientation="horizontal">
			<FieldContent>
				<FieldLabel for="2fa">Multi-factor authentication</FieldLabel>
				<FieldDescription>
					Enable multi-factor authentication. If you do not have a two-factor device, you can use a one-time code sent to your email.
				</FieldDescription>
			</FieldContent>
			<Switch id="2fa" />
		</FieldRoot>
	</div>
</Story>

<Story name="ChoiceCard" asChild>
	<div class="w-full min-w-sm max-w-md">
		<FieldGroup>
			<FieldSet>
				<FieldLabel for="compute-environment-p8w">Compute Environment</FieldLabel>
				<FieldDescription>Select the compute environment for your cluster.</FieldDescription>
				<RadioGroup value="kubernetes">
					<FieldLabel for="kubernetes-r2h">
						<FieldRoot orientation="horizontal">
							<FieldContent>
								<FieldTitle>Kubernetes</FieldTitle>
								<FieldDescription>Run GPU workloads on a K8s configured cluster.</FieldDescription>
							</FieldContent>
							<RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
						</FieldRoot>
					</FieldLabel>
					<FieldLabel for="vm-z4k">
						<FieldRoot orientation="horizontal">
							<FieldContent>
								<FieldTitle>Virtual Machine</FieldTitle>
								<FieldDescription>Access a VM configured cluster to run GPU workloads.</FieldDescription>
							</FieldContent>
							<RadioGroupItem value="vm" id="vm-z4k" />
						</FieldRoot>
					</FieldLabel>
				</RadioGroup>
			</FieldSet>
		</FieldGroup>
	</div>
</Story>
