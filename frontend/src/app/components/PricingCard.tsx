import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const plans = [
  {
    name: 'Basic',
    price: '$9',
    description: 'Essential features for small agencies',
    features: ['Up to 5 projects', 'Basic analytics', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Advanced tools for growing agencies',
    features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom branding'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large agencies',
    features: ['All Pro features', 'Dedicated account manager', 'Custom integrations', 'SLA'],
  },
]

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
      {plans.map((plan) => (
        <Card key={plan.name} className="flex flex-col bg-slate-950/50 border-teal-500/30 hover:border-teal-400/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
            <CardDescription className="text-white">{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-4xl font-bold text-teal-400 mb-4">{plan.price}<span className="text-lg font-normal text-white">{plan.price !== 'Custom' && '/month'}</span></p>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-white">
                  <Check className="h-5 w-5 text-white mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
