import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
    trigger('slideInAnimation', [
        transition('* <=> *', [
            query(':enter', [
                style({ transform: 'translateX(-100%)'})
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ transform: 'translateX(100%)'}))
                ]),
                query(':enter', [
                    animate('300ms ease-out', style({ transform: 'translateX(0%)'}))
                ])
            ]),
            query(':enter', animateChild()),
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
            query(':enter',
                [
                    style({ opacity: 0, display: 'none' })
                ],
                { optional: true }
            ),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave',
                    [
                        style({ opacity: 1,  display: 'flex' }),
                        animate('200ms ease-in-out', style({ opacity: 0, display: 'none' }))
                    ],
                    { optional: true }
                ),
                query(':enter',
                    [
                        style({ opacity: 0, display: 'flex' }),
                        animate('200ms ease-in-out', style({ opacity: 1, display: 'flex' }))
                    ],
                    { optional: true }
                )
            ]),
            query(':enter', animateChild()),
        ])
    ]);
