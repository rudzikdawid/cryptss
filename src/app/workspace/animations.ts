import {animate, animateChild, group, query, stagger, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
    trigger('slideInAnimation', [
        transition('* <=> *', [
            query(':enter', [
                style({ transform: 'translateY(20%)'})
            ], { optional: true }),
            // query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ opacity: 0}))
                ], { optional: true }),
                query(':enter', [
                    animate('300ms ease-out', style({ transform: 'translateX(0%)'}))
                ], { optional: true })
            ]),
            // query(':enter', animateChild()),
        ])
    ]);


export const myAnimation =
    trigger(
        'myAnimation',
        [
            transition(
                ':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({'opacity': 1}))
                ]
            ),
            transition(
                ':leave', [
                    style({'opacity': 1}),
                    animate('500ms', style({'opacity': 0}))
                ]
            )]
    );

export const fadeAnimation =
    trigger('fadeAnimation', [
        transition( '* <=> *', [
            query(':enter .rrr',
                [
                    style({ opacity: 0 })
                ],
                { optional: true }
            ),
            // query(':leave', animateChild(), { optional: true }),
            group([
                query(':enter .uuu',
                    [
                        style({ 'transform': 'rotate(-180deg) scale(0)' }),
                        animate('200ms', style({ 'transform': 'rotate(0) scale(1)' }))
                    ],
                    { optional: true }
                ),
                query(':leave .uuu',
                    [
                        style({ 'transform': 'rotate(0) scale(1)' }),
                        animate('200ms', style({ 'transform': 'rotate(180deg) scale(0)' }))
                    ],
                    { optional: true }
                ),

                query(':leave .rrr',
                    [
                        style({ opacity: 1 }),
                        animate('400ms ease-in-out', style({ opacity: 0 }))
                    ],
                    { optional: true }
                ),
                query(':enter .rrr',
                    [
                        style({ opacity: 0 }),
                        animate('400ms ease-in-out', style({ opacity: 1 }))
                    ],
                    { optional: true }
                )
            ]),
            // query(':enter', animateChild()),
        ])
    ]);
